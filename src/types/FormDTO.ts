export interface TeachATopicDTO {
    internName: string;
    rating1: number;
    rating2: number;
    rating3: number;
    rating4: number;
    URL: string;
    remark: string;
}


export interface SearchEngineQuestionnareDTO {
    internName: string;
    rating1: number;
    rating2: number;
    rating3: number;
    URL: string;
    remark: string;
}

export interface AttendanceDTO {
    internName: string,
    rating1: number;
}

export interface GoogleSpreadsheetDTO {
    internName: string,
    rating1: number,
    URL: string,
    remark: string
}

export interface GroupDiscussionDTO extends SearchEngineQuestionnareDTO {

}

export interface OrigamiDTO extends AttendanceDTO {

}

export interface PersonalityDTO {
    internName: string,
    personalityType: string
}

export interface PersonalSuggestionDTO {
    internName: string,
    personalDescription: string
}

export interface PunctualityDTO extends AttendanceDTO {

}

export interface TeamTaskDTO extends TeachATopicDTO {

}