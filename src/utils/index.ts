// 定义格式化封装函数
export function forma_data(timer: Date) {
  const year = timer.getFullYear();
  const month = timer.getMonth() + 1; // 由于月份从0开始，因此需加1
  const day = timer.getDate();
  const hour = timer.getHours();
  const minute = timer.getMinutes();
  const second = timer.getSeconds();
  return `${pad(year, 4)}-${pad(month)}-${pad(day)} ${pad(hour)}:${pad(
    minute
  )}:${pad(second)}`;
}
export function forma_data_day(timer: Date) {
  const year = timer.getFullYear();
  const month = timer.getMonth() + 1; // 由于月份从0开始，因此需加1
  const day = timer.getDate();
  return `${pad(year, 4)}-${pad(month)}-${pad(day)}`;
}
// 定义具体处理标准
// timeEl 传递过来具体的数值：年月日时分秒
// total 字符串总长度 默认值为2
// str 补充元素 默认值为"0"
function pad(timeEl: number, total = 2, str = "0") {
  return timeEl.toString().padStart(total, str);
}
// 调用函数
// console.log(formaData(time)) // 2023-05-29 00:30:19

export const exam_time = (start_time: number, end_time: number): string => {
  let [start_day, start_hour] = forma_data(new Date(start_time))
    .toString()
    .split(" ");
  let [end_day, end_hour] = forma_data(new Date(end_time))
    .toString()
    .split(" ");

  return `${start_day} ${start_hour}  -  ${
    start_day == end_day ? "" : end_day
  } ${end_hour}`;
};
