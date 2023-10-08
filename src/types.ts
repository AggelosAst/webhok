export interface Options {
    debug: boolean,
}

export type webhookExecution = {
    response : string | object,
    error? : {
        data: string | object,
        statusCode: string,
    }
}
export type Embed = {
    title?: string;
    type?: string;
    description?: string;
    url?: string;
    timestamp?: string; // ISO8601 timestamp
    color?: number;
    footer?: EmbedFooter;
    image?: EmbedImage;
    thumbnail?: EmbedThumbnail;
    video?: EmbedVideo;
    provider?: EmbedProvider;
    author?: EmbedAuthor;
    fields?: EmbedField[];
};

export type EmbedFooter = {
    text: string;
    icon_url?: string;
    proxy_icon_url?: string;
};

export type EmbedImage = {
    url: string;
    proxy_url?: string;
    height?: number;
    width?: number;
};

export type EmbedThumbnail = {
    url: string;
    proxy_url?: string;
    height?: number;
    width?: number;
};

export type EmbedVideo = {
    url: string;
    height?: number;
    width?: number;
};

export type EmbedProvider = {
    name?: string;
    url?: string;
};

export type EmbedAuthor = {
    name?: string;
    url?: string;
    icon_url?: string;
    proxy_icon_url?: string;
};

export type EmbedField = {
    name: string;
    value: string;
    inline?: boolean;
};

export type webhookOptions = {
    content?: string,
    embeds?: Embed,
    username? : string
}
export type webhookError = {
    message: string,
    retry_after: number,
    global: boolean,
    code?: number,
}
