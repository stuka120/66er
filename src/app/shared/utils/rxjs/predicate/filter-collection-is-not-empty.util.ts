export function collectionIsNotEmpty(collection: any[] | undefined): boolean {
  return collection != null && collection.length > 0;
}
