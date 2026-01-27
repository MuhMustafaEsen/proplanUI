import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  //TableCell,
  TableContainer,
  TableHead,
  //TableRow,
  Tooltip,
  IconButton,
  Typography
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

import {useEffect,useState} from "react";
import type { Company } from "../../core/models/Company";
import { companyService } from "../../core/api/company.service";
import CompanyForm from "./CompanyForm";

import { StyledTableRow, StyledTableCell } from "../../styles/tableStyles";

export default function CompanyList(){
  const [companies,setCompanies] = useState<Company[]>([]);
  const [openForm,setOpenForm] = useState(false);
  const [selected,setSelected] = useState<Company | null>(null);

  const loadData = async() => {
    const data = await companyService.getAll();
    setCompanies(data);
  };

  useEffect(() => {
    loadData();
  },[]);

  const handleEdit = (company:Company) => {
    setSelected(company);
    setOpenForm(true);
  };

  const handleClose = () =>{
    setSelected(null);
    setOpenForm(false);
  };

  return(
    <Box>
      <Box sx={{ display: "flex",justifyContent:"space-between",mb:2}}>
        <Typography variant="h5">Firmalar</Typography>
        <Button variant="contained"
        onClick={() => setOpenForm(true)}>
          Yeni Firma Ekle
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>FİRMA ADI</StyledTableCell>
              <StyledTableCell>FİRMA ADRESİ</StyledTableCell>
              <StyledTableCell>TELEFON NO</StyledTableCell>
              <StyledTableCell>AKTİFLİK DURUMU</StyledTableCell>
              <StyledTableCell width={120}>İŞLEM</StyledTableCell>
            </StyledTableRow>
          </TableHead>

          <TableBody>
            {companies.map((c) => (
              <StyledTableRow key={c.id}>
              <StyledTableCell>{c.companyName}</StyledTableCell>
              <StyledTableCell>{c.address}</StyledTableCell>
              <StyledTableCell>{c.phone}</StyledTableCell>
              <StyledTableCell>{c.isActive ? "Evet" : "Hayır"}</StyledTableCell>
              <StyledTableCell align="center">
                <Tooltip title="Düzenle">
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => handleEdit(c)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                {/*
                <Button size="small" onClick={() => handleEdit(c)}>
                  Düzenle
                </Button>
              */}
              </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CompanyForm
      open={openForm}
      onClose={handleClose}
      company={selected}
      onSuccess={loadData}/>
    </Box>
  );
}



/*
const CompanyList = () => {
  return <div>Company List</div>;
};

export default CompanyList;
*/
