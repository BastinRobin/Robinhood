export class CommonService {
    static convertToSlug(text: string): string {
      return text
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
    }
  }
  
  export default new CommonService();