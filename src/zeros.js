const getDate = () => {
  const trailing = (d) => d.length < 10 ? '0'+d : d;
  const now = new Date();
  return `${now.getFullYear()}-${trailing(now.getMonth())}-${trailing(now.getDate())} ${trailing(now.getHours())}:${trailing(now.getMinutes())}:${trailing(now.getSeconds())}`;
}