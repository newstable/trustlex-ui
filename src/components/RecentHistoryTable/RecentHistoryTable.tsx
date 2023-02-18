import { TableProps } from "@mantine/core";
import { CurrencyEnum } from "~/enums/CurrencyEnum";
import { StatusEnum } from "~/enums/StatusEnum";
import { IPlanning } from "~/interfaces/IPlanning";
import { getIconFromCurrencyType } from "~/utils/getIconFromCurrencyType";
import ImageIcon from "../ImageIcon/ImageIcon";
import Table from "../Table/Table";
import styles from "./RecentHistoryTable.module.scss";
import SeeMoreButton from "../SeeMoreButton/SeeMoreButton";

export interface ITableRow {
  orderNumber: string | number;
  planningToSell: IPlanning;
  planningToBuy: IPlanning;
  rateInBTC: number;
  date: string;
  status: StatusEnum;
}

interface Props extends TableProps {
  tableCaption?: string;
  cols: string[];
  data: ITableRow[];
  mobile?: boolean;
}

const RecentHistoryTable = ({ tableCaption, cols, data, mobile }: Props) => {
  const tableData = !mobile
    ? data.map((row) => [
        row.orderNumber,
        <div className={styles.planningCell}>
          {row.planningToSell.amount}{" "}
          <ImageIcon image={getIconFromCurrencyType(row.planningToSell.type)} />{" "}
          {row.planningToSell.type}
        </div>,
        <div className={styles.planningCell}>
          {row.planningToBuy.amount}{" "}
          <ImageIcon image={getIconFromCurrencyType(row.planningToBuy.type)} />{" "}
          {row.planningToBuy.type}
        </div>,
        <div className={styles.planningCell}>
          {row.rateInBTC}{" "}
          <ImageIcon image={getIconFromCurrencyType(CurrencyEnum.BTC)} />{" "}
          {CurrencyEnum.BTC}
        </div>,
        row.date,
        <div className={styles.statusCell}>
          <ImageIcon image="/icons/check-circle.svg" />
          {row.status}
        </div>,
      ])
    : data.map((row) => [
        row.orderNumber,

        row.date,
        <SeeMoreButton onClick={() => {}} />,
      ]);

  return (
    <Table
      horizontalSpacing={mobile ? "xs" : "md"}
      verticalSpacing={"md"}
      tableCaption={tableCaption}
      cols={cols}
      data={tableData}
    />
  );
};

export default RecentHistoryTable;
