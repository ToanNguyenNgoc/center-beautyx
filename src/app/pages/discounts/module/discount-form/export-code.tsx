/* eslint-disable react-hooks/exhaustive-deps */
import { LoadingButton } from "@mui/lab";
import { ReqDiscountCode } from "@types";
import { discountsApi } from "app/api";
import { IDiscountPar } from "app/interface";
import { FC, useEffect, useState } from "react";
import { useMutation } from "react-query";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx"
import moment from "moment";
import { slugify } from "app/util";

interface Props {
  discount: IDiscountPar,
  title?: string,
  size?:"small" | "medium" | "large"
}

export const ExportCode: FC<Props> = ({ discount, title = ' Xuất mã giảm giá', size='medium' }) => {
  const [totalPage, setTotalPage] = useState(1)
  const limit = 30
  const [codes, setCodes] = useState<Array<string>>([])
  const { mutate, data, isLoading } = useMutation({
    mutationKey: ['GET_CODE', discount.uuid],
    mutationFn: (qr: ReqDiscountCode) => discountsApi.getCodeIsCampaign({
      uuid: discount.uuid,
      page: qr.page,
      limit: limit
    }),
    onSuccess(data) {
      const codesPerPage = data.data
      setCodes(prev => {
        return prev = [...prev, ...codesPerPage]
      })
      setTotalPage(Math.ceil(data.total / limit))
    },
  })

  const onGetCode = () => {
    setCodes([])
    setTotalPage(1)
    mutate({ page: 1 })
  }
  useEffect(() => {
    if (totalPage > 1) {
      for (var i = 2; i <= totalPage; i++) { mutate({ page: i }) }
    }
  }, [totalPage])
  useEffect(() => {
    if (codes.length === data?.total) {
      onExportFile({
        file_name: slugify(discount.title),
        codes: codes
      })
    }
  }, [codes, data?.total])
  return (
    <>
      <LoadingButton
        color="success"
        size={size}
        variant="contained"
        onClick={onGetCode}
        type="button"
        loading={isLoading}
      >
        <i style={{ marginRight: '4px', color: 'var(--kt-white)' }} className="bi bi-download"></i>
        {title}
      </LoadingButton>
    </>
  )
}
const onExportFile = ({ file_name, codes }: { file_name: string, codes: Array<string> }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  // Create an array of data with custom color and additional text
  const apiData = codes.map((i) => {
    return {
      code: i
    };
  });

  // Create an array for the title row
  const titleRow = ['STT', 'Danh sách mã']; // Replace with your actual titles

  // Add the title row to the beginning of the data array
  const dataWithTitles = [titleRow, ...apiData.map((item, i) => [i + 1, item.code])];

  // Convert the data array to a worksheet
  const ws = XLSX.utils.aoa_to_sheet(dataWithTitles);
  // Define column widths
  const columnWidths = [
    { wch: 8 }, // Width of column 3 (8 characters)
    { wch: 45 },
  ];

  // Set column widths in the worksheet
  ws['!cols'] = columnWidths;

  // Create a workbook containing the worksheet
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

  // Convert the workbook to an Excel buffer
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

  // Create a Blob from the Excel buffer
  const data = new Blob([excelBuffer], { type: fileType });

  // Save the Blob as a file using FileSaver
  FileSaver.saveAs(data, `Ma_giam_gia_${file_name}_${moment().format('DDHHmmss')}` + fileExtension);

}
