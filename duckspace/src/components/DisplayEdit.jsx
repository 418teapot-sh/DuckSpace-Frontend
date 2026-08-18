import { Stage, Layer, Image, Transformer, Circle, Group } from "react-konva";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import useImage from "use-image";
import displayBackImg from "../assets/displaybackgrounds/display_back.png";
import { useDisplayStore } from "../store/displayStore";


import closeIcon from "../assets/displayIcon/close.svg";
import addIcon from "../assets/displayIcon/add.svg";
import saveIcon from "../assets/displayIcon/save.svg";

import { updateExhibitionItemPosition } from "../apis/displayApi";
// 테스트
function DraggableImage({ item, onChange, isEditing, isSelected, onSelect, }) {  
    const [image] = useImage(item.src);
    const imageRef = useRef(null);
    const transformerRef = useRef(null);

  useEffect(() => {
    if (isSelected && imageRef.current && transformerRef.current) {
      transformerRef.current.nodes([imageRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Image
        ref={imageRef}
        image={image}
        x={item.x}
        y={item.y}
        width={item.width}
        height={item.height}
        rotation={item.rotation || 0}
        

        // 편집 모드일 때만 드래그 가능
        draggable={isEditing}
        // 편집 모드일 때만 이벤트 받기
        listening={isEditing}

        // 이미지 클릭하면 선택
        onClick={() => {
          if (isEditing) {
            onSelect();
          }
        }}
        onTap={() => {
          if (isEditing) {
            onSelect();
          }
        }}
        onDragEnd={(e) => {
          if (!isEditing) return;
          console.log("x:", e.target.x());          
          console.log("y:", e.target.y());
          onChange({
            ...item,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          if (!isEditing) return;

          const node = e.target;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          console.log("x:", node.x());
          console.log("y:", node.y());
          console.log("scaleX:", node.scaleX());
          console.log("scaleY:", node.scaleY());
          console.log("rotation:", node.rotation());
          onChange({
            ...item,
            x: node.x(),
            y: node.y(),
            width: Math.max(20, node.width() * scaleX),
            height: Math.max(20, node.height() * scaleY),
            rotation: node.rotation(),
          });
        }}
      />
      {isEditing && isSelected && (
        <Transformer
          ref={transformerRef}
          keepRatio={true}          
          rotateEnabled={true}
          enabledAnchors={[
            "top-left",
            "top-right",
            "bottom-left",
            "bottom-right",
          ]}
        />
      )}
    </>
  );
}

function CircleButton({ x, y, icon, onClick }) {
  return (
    <Group
      x={x}
      y={y}
      onClick={onClick}
      onTap={onClick}
      onMouseEnter={(e) => {
        const stage = e.target.getStage();
        stage.container().style.cursor = "pointer";
      }}
      onMouseLeave={(e) => {
        const stage = e.target.getStage();
        stage.container().style.cursor = "default";
      }}
    >
      <Circle
        radius={30}
        fill="rgba(255, 255, 255, 0.75)"
      />

      <Image
        image={icon}
        width={28}
        height={28}
        x={-14}
        y={-14}
      />
    </Group>
  );
}

function DisplayEdit({ exhibitionId }) {

    const navigate = useNavigate();
    const [displayBack] = useImage(displayBackImg);

    const [closeImage] = useImage(closeIcon);
    const [addImage] = useImage(addIcon);
    const [saveImage] = useImage(saveIcon);

    const items = useDisplayStore((state) => state.editingItems);
    const setItems = useDisplayStore((state) => state.setEditingItems);
    const updateItem = useDisplayStore((state) => state.updateItem);
    const isEditing = useDisplayStore((state) => state.isEditing);
    const setIsEditing = useDisplayStore((state) => state.setIsEditing);

    const [selectedId, setSelectedId] = useState(null);
    const [originalItems, setOriginalItems] = useState([]);

    

    
    const handleSave = async () => {
        try {
            const requests = items.map((item) => {
            const placement = {
                posX: item.x / 360,
                posY: item.y / 400,
                width: item.width / 360,
                height: item.height / 400,
                rotation: item.rotation ?? 0,
            };

            return updateExhibitionItemPosition(
                exhibitionId,
                item.itemId,
                placement
            );
            });

            await Promise.all(requests);

            alert("저장되었습니다.");

            setIsEditing(false);
            setSelectedId(null);

            setOriginalItems(
            items.map((item) => ({ ...item }))
            );
        } catch (error) {
            console.error(
            "장식장 위치 저장 실패:",
            error.response?.data || error
            );

            alert("저장에 실패했습니다.");
        }
    };

  return (
    <div className="flex justify-center">
      <Stage width={360} height={400}>
        <Layer listening={false}>
          <Image image={displayBack} width={360} height={400} />
        </Layer>

        <Layer>
            {items.map((item) => (
                <DraggableImage
                    key={item.id}
                    item={item}
                    isEditing={isEditing}
                    isSelected={selectedId === item.id}
                    onSelect={() => setSelectedId(item.id)}
                    onChange={(updatedItem) => {
                        updateItem(updatedItem);
                    }}
                />
            ))}
        </Layer>

        {/* 버튼 */}
        <Layer>
            {!isEditing ? (
                <CircleButton
                    x={320}
                    y={360}
                    icon={addImage}
                    onClick={() => {
                        setOriginalItems(
                            items.map((item) => ({ ...item }))
                        );
                        setIsEditing(true);
                        setSelectedId(null);
                    }}
                />
            ) : (
                <>
                    {/* 저장 안 하고 나가기 */}
                    <CircleButton
                        x={320}
                        y={225}
                        icon={closeImage}
                        onClick={() => {
                            setItems(originalItems);

                            setIsEditing(false);
                            setSelectedId(null);
                        }}
                    />

                    {/* 객체 추가 */}
                    <CircleButton
                        x={320}
                        y={295}
                        icon={addImage}
                        onClick={() => {
                            console.log("객체 추가");
                            navigate("/display/list", {
                                state: {  
                                    mode: "select",
                                    exhibitionId,
                                },
                            });
                        }}
                    />
                    {/* 저장 */}
                    <CircleButton
                        x={320}
                        y={365}
                        icon={saveImage}
                        onClick={handleSave}
                        
                    />
                </>
            )}
        </Layer>

      </Stage>
      
    </div>
  );
}

export default DisplayEdit;

