import { useRef, useState } from "react";
import { homeMockData } from "../../data/homeMockData";

function HomeSlide() {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = () => {
    const slider = sliderRef.current;

    if (!slider) return;

    const cards = slider.children;

    if (!cards.length) return;

    const sliderCenter =
      slider.scrollLeft + slider.clientWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    Array.from(cards).forEach((card, index) => {
      const cardCenter =
        card.offsetLeft + card.offsetWidth / 2;

      const distance = Math.abs(
        sliderCenter - cardCenter
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setCurrentIndex(closestIndex);
  };

  return (
    <section className="mt-5">
      {/* 슬라이드 영역 */}
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        className="
          flex
          items-center
          snap-x
          snap-mandatory
          gap-2
          overflow-x-auto
          px-[55px]
          scrollbar-hide
        "
      >
        {homeMockData.map((popup, index) => {
          const isActive = currentIndex === index;

          return (
            <div
              key={popup.id}
              className={`
                relative
                shrink-0
                snap-center
                bg-[#CDDCF7]
                overflow-hidden
                rounded-[8px]
                transition-all
                duration-300
                ${
                  isActive
                    ? "h-[160px] w-[280px]"
                    : "h-[140px] w-[250px]"
                }
              `}
            >
              <img
                src={popup.imageUrl}
                alt={popup.title}
                className="h-full w-full object-cover"
              />

              {/* 제목 + 현재 슬라이드 번호 */}
              <div className="absolute bottom-[8px] left-0 right-0 flex flex-col items-center justify-center">
                <p className="text-lg font-semibold text-[#FCFCFC]">
                  {popup.title}
                </p>

                {isActive && (
                  <p className="mt-1 text-sm text-[#FCFCFC]">
                    {currentIndex + 1} / {homeMockData.length}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default HomeSlide;