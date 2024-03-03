// ...

export const validateContentRule = (_, value) => {
    if(!value){
        return Promise.resolve();
    }
    const htmlTagRegex = /<(.|\n)*?>/g;
    const emojiRegex = /.../g; // (Your emoji regex here)

    if (value && (htmlTagRegex.test(value) || value.match(emojiRegex))) {
        return Promise.reject("Please enter valid content with no HTML tags or emojis.");
    }
    return Promise.resolve();
}

export const validateContent = (value) => {
    const htmlTagRegex = /<(.|\n)*?>/g;

    if (htmlTagRegex.test(value)) {
        return false; // Invalid content
    }

    return true; // Valid content
}
