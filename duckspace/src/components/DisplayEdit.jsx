import { Stage, Layer, Image, Transformer } from "react-konva";
import { useEffect, useRef, useState } from "react";
import useImage from "use-image";
import displayBackImg from "../assets/displaybackgrounds/display_back.png";

function DraggableImage({ item, onChange, isEditing, isSelected, setIsSelected }) {  const [image] = useImage("/favicon.svg");
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
            setIsSelected(true);
          }
        }}
        onTap={() => {
          if (isEditing) {
            setIsSelected(true);
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

function DisplayEdit() {
  const [displayBack] = useImage(displayBackImg);

  const [item, setItem] = useState(() => {
    const saved = localStorage.getItem("displayData");

    return saved
      ? JSON.parse(saved)
      : {
          id: 1,
          src: "/favicon.svg",
          x: 100,
          y: 100,
          width: 50,
          height: 50,
          rotation: 0,
        };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const handleSave = () => {
    localStorage.setItem(
      "displayData",
      JSON.stringify(item)
    );
    setIsEditing(false);
    setIsSelected(false);
  };

  return (
    <div>
      <Stage width={360} height={400}>
        <Layer listening={false}>
          <Image image={displayBack} width={360} height={400} />
        </Layer>
        <Layer>
          <DraggableImage
              item={item}
              onChange={setItem}
              isEditing={isEditing}
              isSelected={isSelected}
              setIsSelected={setIsSelected}
            />
        </Layer>
      </Stage>

      {!isEditing ? (
        <button
          onClick={() => setIsEditing(true)}
          className="mt-4 h-12 w-12 cursor-pointer rounded-full bg-[#5791FB] text-2xl text-white"
        >
          +
        </button>
      ) : (
        <button
          onClick={handleSave}
          className="mt-4 cursor-pointer rounded-lg bg-[#5791FB] px-6 py-3 text-white"
        >
          저장
        </button>
      )}
    </div>
  );
}

export default DisplayEdit;

