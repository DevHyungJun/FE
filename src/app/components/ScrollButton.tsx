type directon = "left" | "right";

interface ScrollButtonProps {
  direction: directon;
  icon: React.ReactNode;
  startScrolling: (direction: directon) => void;
  stopScrolling: () => void;
  scroll: (direction: directon) => void;
}

export default function ScrollButton({
  direction,
  icon,
  startScrolling,
  stopScrolling,
  scroll,
}: ScrollButtonProps) {
  return (
    <button
      onMouseDown={() => startScrolling(direction)}
      onMouseUp={stopScrolling}
      onMouseLeave={stopScrolling}
      onTouchStart={() => startScrolling(direction)}
      onTouchEnd={stopScrolling}
      onTouchCancel={stopScrolling}
      onClick={() => scroll(direction)}
    >
      {icon}
    </button>
  );
}
