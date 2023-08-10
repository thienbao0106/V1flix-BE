//send object {response: res, dataSuccess, dataFailed}
//will fix the type soon
export const createData: (
  model: any,
  data: {},
  defaultData: {},
  send: any
) => void = async (model: any, data: {}, defaultData: {}, send: any) => {
  const [result, created] = await model.findOrCreate({
    where: data,
    defaults: defaultData,
  });
  if (created) {
    send.response.json({
      status: send.dataSuccess.status,
      message: send.dataSuccess.message,
    });
  } else {
    send.response.json({
      status: send.dataFailed.status,
      message: send.dataFailed.message,
    });
  }
  console.log(result);
};

export const createImagesData = (nameSeries: string, seriesId: number) => {
  const name = nameSeries.toLocaleLowerCase().replaceAll(" ", "_");
  const types = ["banner", "thumbnail", "card"];
  return types.map((type) => {
    return {
      name,
      type,
      seriesId,
    };
  });
};
