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
    CALL usp_add_post_basic(?,?,?,?)
  `, [post_title, post_subtitle, post_contents, post_user_no])
  return dataConvertToJson(insertResult[0])
}

export type UpdatePostParamType = Pick<PostEntity, "post_title"|"post_subtitle"|"post_contents"|"post_no">
export const updatePost = async ({post_no, post_contents, post_subtitle, post_title}: UpdatePostParamType) => {
  const updateResult = await query(`
      CALL usp_mod_post_basic(?,?,?,?)
  `, [post_no, post_title, post_subtitle, post_contents])
  return dataConvertToJson(updateResult[0])
}

export const selectPostList = async ({pageNo, pagePerCnt}) => {
  const selectResult = await query(`
    CALL usp_get_list_post_basic(?,?);
  `, [pageNo, pagePerCnt])
  return {
    cnt:dataConvertToJson(selectResult[0]).cnt,
    list:dataConvertToJson(selectResult[1], true)
  }
}

export const selectPost = async (postNo) => {
  const selectResult = await query(`
    CALL usp_get_post_basic(?);
  `, [postNo])
  return dataConvertToJson(selectResult[0])
}

export const deletePost = async (postNo) => {
  const deleteResult = await query(`
    CALL usp_del_post_basic(?);
  `, [postNo])
  return dataConvertToJson(deleteResult[0])
}