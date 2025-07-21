const formatTime = (second: number | null) => {
  if (second == null) return;
  const min = Math.floor(second / 60);
  const sec = second % 60;
  return `${min}:${sec.toString().padStart(2, "0")}`;
};

export default formatTime;
