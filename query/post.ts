import {query} from "../lib/db";
import {dataConvertToJson} from "../lib/utils";

export type PostEntity = {
  post_no: number,
  post_title: string,
  post_subtitle: string,
  post_contents: string,
  post_user_no: number,
  post_ins_date: string
}

export type PostType = {
  post_no: number,
  post_title: string,
  post_subtitle: string,
  post_contents: string,
  post_user_name: number,
  post_ins_date: string
}

export type PostListType = {
  post_no: number,
  post_title: string,
  post_subtitle: string,
  post_user_name: string,
  post_ins_date: string
}

export type PostListResult = {
  list: Array<PostListType>
  cnt: number
}

export type InsertPostParamType = Pick<PostEntity, "post_title"|"post_subtitle"|"post_contents"|"post_user_no">
export const insertPost = async ({post_contents, post_subtitle, post_title, post_user_no}: InsertPostParamType) => {
  const insertResult = await query(`
      INSERT INTO post_basic (post_title,
                              post_subtitle,
                              post_contents,
                              post_user_no)
      VALUES (?,
              ?,
              ?,
              ?);
  `, [post_title, post_subtitle, post_contents, post_user_no])
  return dataConvertToJson(insertResult)
}

export type UpdatePostParamType = Pick<PostEntity, "post_title"|"post_subtitle"|"post_contents"|"post_no">
export const updatePost = async ({post_no, post_contents, post_subtitle, post_title}: UpdatePostParamType) => {
  const insertResult = await query(`
      UPDATE post_basic
      SET 
          post_title = ?,
          post_subtitle = ?,
          post_contents = ?
      WHERE post_no = ?
  `, [post_title, post_subtitle, post_contents, post_no])
  return dataConvertToJson(insertResult)
}

export const selectPostList = async ({pageNo, pagePerCnt}) => {
  const startNo = (pageNo - 1) * pagePerCnt
  const selectResult = await query(`
      SELECT a.post_no,
             a.post_title,
             a.post_subtitle,
             a.post_ins_date,
             b.user_name as post_user_name
      FROM post_basic as a
               LEFT JOIN user_basic as b
                         ON a.post_user_no = b.user_no
      ORDER BY a.post_ins_date DESC LIMIT ?, ?;
  `, [startNo, Number(pagePerCnt)])
  return dataConvertToJson(selectResult, true)
}

export const selectPost = async (postNo) => {
  const selectResult = await query(`
      SELECT a.post_no,
             a.post_title,
             a.post_subtitle,
             a.post_contents,
             a.post_ins_date,
             b.user_name as post_user_name
      FROM post_basic as a
               LEFT JOIN user_basic as b
                         on a.post_user_no = b.user_no
      WHERE a.post_no = ?;
  `, [postNo])
  return dataConvertToJson(selectResult)
}

export const selectPostCnt = async () => {
  const selectResult = await query(`
      SELECT count(*) as cnt
      FROM post_basic;
  `)
  return dataConvertToJson(selectResult)
}

export const deletePost = async (postNo) => {
  const deleteResult = await query(`
      DELETE
      FROM post_basic
      WHERE post_no = ?
  `, [postNo])
  return dataConvertToJson(deleteResult)
}