import {db, query} from "../lib/db";
import {dataConvertToJson} from "../lib/utils";

export type Post = {
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
  post_user_name: string,
  post_ins_date: string,
  post_tags: string
}

export type PostListType = {
  post_no: number,
  post_title: string,
  post_subtitle: string,
  post_user_name: string,
  post_ins_date: string,
  post_tags: string
}

export type PostListResult = {
  list: Array<PostListType>
  cnt: number
}

export type InsertPostParamType = Pick<Post, "post_title"|"post_subtitle"|"post_contents"|"post_user_no"> & {post_tag_list?: string[]}
export const insertPost = async ({post_contents, post_subtitle, post_title, post_user_no, post_tag_list}: InsertPostParamType) => {
  // insert Post...
  const postInsertResult = await db.query<any>(`
    CALL usp_add_post_basic(?,?,?,?);
  `, [post_title, post_subtitle, post_contents, post_user_no])
  const lastInsertPk =  postInsertResult[0][0].result

  // insert Post_Tag...
  if(lastInsertPk > 0 && post_tag_list && post_tag_list.length > 0){
    for (let i = 0; i < post_tag_list.length; i++) {
      const postTagInsertResult = await db.query<any>(`
        CALL usp_add_post_tag(?,?);
      `,[lastInsertPk, post_tag_list[i]])
    }
  }
  await db.end();
  return {result:1}
}

export type UpdatePostParamType = Pick<Post, "post_title"|"post_subtitle"|"post_contents"|"post_no"> & {post_tag_list?: string[]}
export const updatePost = async ({post_no, post_contents, post_subtitle, post_title, post_tag_list}: UpdatePostParamType) => {
  // update Post...
  const updateResult = await db.query<any>(`
    CALL usp_mod_post_basic(?,?,?,?);
  `, [post_no, post_title, post_subtitle, post_contents])

  // select prev Post_Tag..
  const tagSelectResult = await db.query<any>(`
    CALL usp_get_list_post_tag(?);
  `,[post_no])

  // insert Post_Tag..
  if(post_no > 0 && post_tag_list && post_tag_list.length > 0){
    for (let i = 0; i < post_tag_list.length; i++) {
      const postTagInsertResult = await db.query<any>(`
        CALL usp_add_post_tag(?,?);
      `,[post_no, post_tag_list[i]])
    }

    if(tagSelectResult[0].length > 0){
      const removeTagList =  tagSelectResult[0].filter(tag=>{
        return !post_tag_list.includes(tag.tag_name)
      })
      for (let i = 0; i < removeTagList.length; i++) {
        const postTagDeleteResult = await db.query<any>(`
          CALL usp_del_post_tag(?, ?);
        `,[removeTagList[i].post_no, removeTagList[i].tag_no])
      }
    }
  }
  await db.end();
  return {result:1}
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

  // select prev Post_Tag...
  const tagSelectResult = await db.query<any>(`
    CALL usp_get_list_post_tag(?);
  `,[postNo])

  // remove Post_tag...
  for (let i = 0; i < tagSelectResult.length; i++) {
    const postTagDeleteResult = await db.query<any>(`
        CALL usp_del_post_tag(?, ?);
      `,[tagSelectResult[i].post_no, tagSelectResult[i].tag_no])
  }

  return dataConvertToJson(deleteResult[0])
}