import { postData } from "..";

export interface Question {
  id: number;
  name: string;
  content: string | Record<string, string>;
  /** 1:单选,2多选,3判断,4填空,5问答 */
  question_type: number;
  score: number;
  answer: any;
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
  start_time: number;
  content: QuestionList[];
}
// 获取试卷
export async function getPaperById({ id }: { id: number }) {
  return postData("/paper", { id }).then((data: Paper | false) => {
    if (!data) {
      return data;
    }
    for (let k in data.content) {
      data.content[k].content.forEach((item) => {
        item.content = JSON.parse(item.content as string);
      });
    }
    console.log(data);

    return data;
  });
}
interface answerPaper {
  content: string;
  user_id: number;
  paper_id: number;
  answer_type: 0 | 1;
  status: number;
  scores: number;
}
interface answerRequest {
  user_id: number;
  paper_id: number;
}
// 设置答案
export async function setAnswer(obj: answerPaper) {
  return postData("/setAnswer", obj).then((data: Paper) => {
    for (let k in data.content) {
      data.content[k].content.forEach((item) => {
        item.content = JSON.parse(item.content as string);
      });
    }
    return data;
  });
}

// 获取提交
export async function getAnswer(obj: answerRequest): Promise<answerPaper> {
  return postData("/getAnswer", obj).then((data: answerPaper) => {
    return data;
  });
}
interface QuestionAnswer {
  answer: number;
  id: number;
}
export async function getQuestionAnswer(obj: {
  id: number;
}): Promise<QuestionAnswer> {
  return postData("/getQuestion", obj).then((data: QuestionAnswer) => {
    return data;
  });
}

export interface PaperInfo {
  id: number;
  name: string;
  question_num: number;
  minutes: number;
  /** 0:密封 1:发放 2:答案可查看 */
  status: number;
  created_time: number;
  end_time: number;
  update_time: number;
  start_time: number;
  desc: string;
  total: number;
  duration: number;
}

// 获取考试列表{
export async function getPaperList(id: number): Promise<PaperInfo[]> {
  return postData("/test", { id }).then((data: any) => {
    if (data) {
      return data.content.map((item: PaperInfo) => {
        item.end_time = item.duration * 60 + item.start_time;
        return item;
      });
    } else {
      return [];
    }
  });
}

// 获取提交列表
export interface AnswerInfo {
  paper_id: number;
  user_id: number;
  name: string;
  score: number;
  status: number;
}
export async function getAnswerInfoList(id: number): Promise<AnswerInfo[]> {
  return postData("/getAnswerInfoList", { paper_id: id }).then((data: any) => {
    if (data?.items) {
      return data.items
    } else {
      return [];
    }
  });
}

export interface PaperUserInfo {
  paper_id: number;
  user_id: number;
}
export async function getPaperUser(data:PaperUserInfo) {
  return postData("/getPaperUser", data).then((data: any) => {
    return data
  });
}

export interface SetPaperUserInfo {
  paper_id: number;
  user_id: number;
  /**
   * 0:交卷 1:考试中 2:没进入 3:未开放
   */
  status: number;
}
export async function setPaperUser(data:SetPaperUserInfo) {
  return postData("/setPaperUser", data).then((data: any) => {
    if (data) {
      return data
    } else {
      throw new Error("信息错误");
    }
  });
}

// 获取
// setAnswer
