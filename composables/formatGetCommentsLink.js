export default function () {
    return { review: reviewLink, film: filmLink, replies: replyLink, user: userLink, repliesToUser: repliesToUserLink };
}

function reviewLink(id) {
    return { get: `/api/comments/review/${id}`, post: `/api/comments/review/${id}` };
}

function filmLink(link) {
    return { get: `/api/comments/film/${link}`, post: `/api/comments/film/${link}` };
}

function replyLink(id, postId) {
    return { get: `/api/comments/reply/${id}`, post: `/api/comments/reply/${postId}` };
}

function userLink(id) {
    return { get: `/api/comments/user/${id}/all`};
}

function repliesToUserLink(id) {
    return { get: `/api/comments/user/${id}/replies`};
}