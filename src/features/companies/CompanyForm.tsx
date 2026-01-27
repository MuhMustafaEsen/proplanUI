import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Switch,
    FormControlLabel
} from "@mui/material"
import { useEffect,useState } from "react";
import type { Company } from "../../core/models/Company";
import { companyService } from "../../core/api/company.service";
import { useUI } from "../../core/ui/uiContext";
import { useFormValidation } from "../../core/validatehooks/useFormValidation";

interface Props {
    open:boolean;
    onClose: () => void;
    onSuccess: () => void;
    company: Company | null;
}

export default function CompanyForm({
    open,
    onClose,
    onSuccess,
    company
}:Props) {
    const [id,setCompanyId] = useState("");
    const [companyName,setCompanyName] = useState("");
    const [address,setAddress] = useState("");
    const [phone,setPhone] = useState("");
    const [isActive,setIsActive] = useState(true);

    const { showMessage } = useUI();

    const values = {
        companyName,
        address,
        phone
    };
    
    const { errors, validateForm } = useFormValidation(values, {
        companyName: {
            required: true,
            minLength: 3,
            message: "Firma adı en az 3 karakter olmalıdır"
        },
        address: {
            required: true,
            minLength: 5,
            message: "Adres en az 5 karakter olmalıdır"
        },
          phone: {
            required: true,
            minLength: 10,
            message: "Telefon numarası geçerli değil"
          }
        });

    useEffect(() => {
        if (company) {
            setCompanyId(company.id.toString());
            setCompanyName(company.companyName);
            setAddress(company.address);
            setPhone(company.phone);
            setIsActive(company.isActive);          
        }else{
            setCompanyId("");
            setCompanyName("");
            setAddress("");
            setPhone("");
            setIsActive(true);
        }
    },[company]);

    const handleSave = async (e:React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            showMessage("Lütfen formu kontrol edin", "warning");
            return;
        }

        try {
            if (company) {
            await companyService.update(company.id,{
                id:parseInt(id),
                companyName,
                address,
                phone,
                isActive    
            });
            showMessage("Firma başariyla güncellendi!", "success");
        }else{
            await companyService.create({
                companyName,
                address,
                phone,
                isActive:true
            });
            showMessage("Yeni firma oluşturuldu!", "success"); 
        }

        onSuccess();
        onClose();
        } catch (error) {
            showMessage("Bir hata oluştu!", "error");
        }
    };

    return(
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" >
            <DialogTitle>
                {company ? "Firma Güncelle" : "Yeni Firma"}
            </DialogTitle>

            <form onSubmit={handleSave}>
            <DialogContent>
                <TextField
                label="Firma Adi"
                fullWidth
                margin="normal"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                error={!!errors.companyName}
                helperText={errors.companyName}
                />
                
                <TextField
                label="adres"
                fullWidth
                margin="normal"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                error={!!errors.address}
                helperText={errors.address}
                />

                <TextField
                label="phone"
                fullWidth
                margin="normal"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={!!errors.phone}
                helperText={errors.phone}
                />

                <FormControlLabel
                control={
                    <Switch
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                    />
                }
                label="Aktif"/>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>İptal</Button>
                <Button variant="contained" type="submit" >Kaydet</Button>
            </DialogActions>
            </form>
        </Dialog>
    );
    
}