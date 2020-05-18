export interface CategoryItemModel {
  _id         : string,
  name        : {
    en: string,
    ru: string,
    am: string
  },
  img         : string,
  price       : number,
  description : {
    en: string,
    ru: string,
    am: string
  },
  category_id : string
}
