import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyBI68u6_agX5j4fw0gzMZS9KQUQCr-HGeM';

export const genAI = new GoogleGenerativeAI(API_KEY);
export const model = genAI.getGenerativeModel({ model: "gemini-pro" });