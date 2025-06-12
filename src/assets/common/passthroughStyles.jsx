
export const dataTableStyles = {
  bodyRow: {
    style: { height: "45px" },
  },
  column: {
    bodyCell: {
      style: { padding: "0px 5px", margin: 0 },
    },
  },
  wrapper: {
    style: {
      borderRadius: "20px",
      outline: "2px solid var(--blue-900)",
      border: "5px solid var(--primary-color)",
      height: "100%",
    },
  },
  table: {
    style: { height: "100%" },
  },
};

export const commonButtonStyles = {
  fontSize: ".75rem",
  minWidth: "0",
  padding: "0",
  height: "30px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const menuBarStyling = {
  root: {
    style: {
      borderRadius: "0",
      border: "none",
      background: "var(--primary-800)",
      display: "flex",
      width: "100%",
      minWidth: "500px",
      justifyContent: "space-around",
      padding: "0px 0rem",
    },
  },
  menu: {
    style: {
      display: "flex",
      justifyContent: "space-between",
      width: "45%",
      maxWidth: "500px",
    },
  },
  menuitem: {
    style: {
      display: "flex",
      padding: "10px",
    },
  },
  start: {
    style: {
      width: "20%",
      minWidth: "200px",
    },
  },
  end: {
    style: {
      width: "20%",
      minWidth: "200px",
      marginLeft: "0",
    },
  },
  content: { style: {} },
};
