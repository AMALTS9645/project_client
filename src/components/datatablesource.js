export const houseColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Name",
    width: 200,
    renderCell: (params) => {
      return <div className="cellWithImg">{params.row.name}</div>;
    },
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },

  {
    field: "address",
    headerName: "Address",
    width: 150,
  },
  {
    field: "distance",
    headerName: "Distance",
    width: 100,
  },
  {
    field: "title",
    headerName: "Title",
    width: 100,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 100,
  },
  {
    field: "bedRoom",
    headerName: "BedRoom",
    width: 100,
  },
  {
    field: "bathRoom",
    headerName: "BathRoom",
    width: 100,
  },
  {
    field: "balcony",
    headerName: "Balcony",
    width: 100,
  },
  {
    field: "furnishing",
    headerName: "Furnishing",
    width: 100,
  },
  {
    field: "facing",
    headerName: "Facing",
    width: 100,
  },
  {
    field: "floors",
    headerName: "Floors",
    width: 100,
  },
  {
    field: "plotArea",
    headerName: "PlotArea(cent)",
    width: 100,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
];

export const landColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return <div className="cellWithImg">{params.row.name}</div>;
    },
  },
  {
    field: "address",
    headerName: "Address",
    width: 230,
  },

  {
    field: "distance",
    headerName: "Distance",
    width: 100,
  },
  {
    field: "title",
    headerName: "Title",
    width: 100,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 100,
  },
  {
    field: "plotArea",
    headerName: "PlotArea",
    width: 100,
  },
  {
    field: "facing",
    headerName: "Facing",
    width: 100,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
];

export const ticketColumns = [
  { field: "_id", headerName: "#", width: 70 },
  {
    field: "subject",
    headerName: "Subjects",
    width: 230,
  },

  {
    field: "status",
    headerName: "Status",
    width: 230,
  },
  {
    field: "openAt",
    headerName: "Opened Date",
    width: 230,
  },
];
