/**
 * @param {Reply[]} replies
 * @param {number} id
 * @returns {Reply}
 */
export function findReplyById(replies, id) {
  let foundReply = null;

  for (let i = 0; i < replies.length; i++) {
    if (replies[i].id === id) {
      foundReply = replies[i];
    } else if (foundReply === null) {
      foundReply = findReplyById(replies[i].replies, id);
    }
  }

  return foundReply;
}
