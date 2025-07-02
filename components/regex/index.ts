// 匹配图片 URL 的正则表达式，允许 HTTP 或 HTTPS 协议开头，并且以 .svg, .img, .jpg, .jpeg, .png, .gif, .bmp, .webp 任何一个作为文件扩展名结尾的 URL
export const imageRegex = /^https?:\/\/.*\.(svg|img|jpg|jpeg|png|gif|bmp|webp)$/i;
// 匹配单词 "smiles" 的正则表达式，不区分大小写。通常用于在文本中查找或验证 SMILES 符号字符串。
export const smilesRegex = /^smiles$/i;
// 匹配 "img", "image", 或 "images" 这三个单词的正则表达式，不区分大小写。可以用于识别或验证包含这些关键词的字符串
export const imageNameRegex = /^(img|image|images)$/i;
