import { Episodes } from "./models/episodes.model";
import { Series } from "./models/series.model";
import { Images } from "./models/images.model";
import { Lists } from "./models/lists.model";
import { Accounts } from "./models/accounts.model";
import { FilmsGeners } from "./models/films_geners.model";
import { Geners } from "./models/geners.model";
export const setRelationships: () => void = () => {
  Images.belongsTo(Series);
  Series.hasMany(Images);
  Series.hasMany(Episodes);
  Episodes.belongsTo(Series);

  Lists.belongsTo(Series);

  Series.hasMany(Lists);

  FilmsGeners.belongsTo(Geners);
  Geners.hasMany(FilmsGeners);
  Series.hasMany(FilmsGeners);
  FilmsGeners.belongsTo(Series);
};
