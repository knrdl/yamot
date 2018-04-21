export type SizePrefix = 1000 | 1024

export class Settings {

  sizeFactor: SizePrefix = 1024 //decimal or binary prefixes

  speedFactor: 8 | 1 = 8 //bit or byte

  windowUpdates: 'always' | 'active' = 'active'

  updateInterval: number = 3 //in secs

  kWhPrice: number = 0 //in cent

}