//Styles utilizing Passthrough

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
}
