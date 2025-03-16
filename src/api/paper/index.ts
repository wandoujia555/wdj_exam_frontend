import { postData } from "..";

export interface Question {
  id: number;
  name: string;
  content: string | Record<string, string>;
  /** 1:单选,2多选,3判断,4填空,5问答 */
  question_type: number;
  score: number;
  answer:any;
}

export interface QuestionList {
  id: number;
  content: Question[];
  name: string;
  question_num: number;
  /** 1:单选,2多选,3判断,4填空,5问答 */
  question_type: number;
  total_score: number;
}

export interface Paper {
  id: number;
  name: string;
  question_num: number;
  minutes: number;
  status: number;
  created_time: number;
  update_time: number;
  content: Record<string, QuestionList>;
}
// 获取试卷
export async function getPaperById({ id }: { id: number }) {
  return postData("/test", { id }).then((data: Paper|false) => {
    if(!data){
      return data
    }
    for (let k in data.content) {
      data.content[k].content.forEach((item) => {
        item.content = JSON.parse(item.content as string);
      });
    }
    console.log(data)

    return data;
  });
}
interface answerPaper {
  content: string;
  user_id: number;
  paper_id: number;
}
// 设置答案
export async function setAnswer({ paper_id, user_id, content }: answerPaper) {
  return postData("/setAnswer", { paper_id, user_id, content }).then(
    (data: Paper) => {
      for (let k in data.content) {
        data.content[k].content.forEach((item) => {
          item.content = JSON.parse(item.content as string);
        });
      }
      return data;
    }
  );
}
// setAnswer
