export const formatScoreNumber = (n) => {
    if (n >= 1000) {
        return (n / 1000).toFixed(1) + 'k';

    } else {
        return n.toString()
    }
}

export const formatFollowersNumber = (n) => {
    return n.toLocaleString()
}