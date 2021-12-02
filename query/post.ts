import {query} from "../lib/db";

export type PostResult = {
  post_no: number,
  post_title: string,
  post_subtitle: string,
  post_contents?: string,
  post_user_no: number,
  post_ins_date: string
}

export type PostListResult = {
  list: Array<PostResult>
  cnt: number
}

export type PostParam = {
  post_title: string,
  post_subtitle: string,
  post_contents: string,
  post_user_no: number,
}

export const insertPost = async ({post_contents, post_subtitle, post_title, post_user_no}: PostParam) => {
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
  return insertResult
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
  return selectResult
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
  const result = Array.isArray(selectResult) ? selectResult[0] : undefined
  return result
}

export const selectPostCnt = async () => {
  const selectResult = await query(`
      SELECT count(*) as cnt
      FROM post_basic;
  `)
  const result = Array.isArray(selectResult) ? selectResult[0].cnt : undefined
  return result
}