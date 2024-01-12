export type Card = {
    id: string
    deckId: string
    userId: string
    answer: string
    answerImg: string | null
    answerVideo: string | null
    created: string
    grade: number
    question: string
    questionImg: string | null
    questionVideo: string | null
    shots: number
    updated: string
}

export type UpdateCardArgs = {
    id: string
    data: FormData
}