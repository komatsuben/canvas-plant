import React, { useEffect, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";

export default function PlantingProjects() {
    return (
        <Stack gap={3} direction={"column"} flexWrap={"wrap"} padding={'3%'}>
            <Stack className="col">
                <Typography 
                    variant="h2" color={"primary"} 
                    fontSize={{xs: "2rem", sm: "3.75rem"}} 
                    textAlign={"center"}
                >
                    PLANTING PROJECTS
                </Typography>
            </Stack>
            <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
                <Typography color={"primary"} variant="h5" textAlign={"justify"} fontSize={{xs: "1rem", sm: "1.5rem"}}>
                    Komunitas CANVAS, dengan semangat kepedulian terhadap lingkungan, menginisiasi program CANVASPLANT untuk mengembalikan kejayaan ekosistem mangrove di Kecamatan Muara Gembong. Desa Pantai Bahagia, yang pernah dikenal sebagai Kampung Dollar, kini menghadapi tantangan serius akibat abrasi. Melalui aksi nyata penanaman mangrove, CANVAS berupaya mengembalikan fungsi hutan mangrove sebagai pelindung pantai dari abrasi, sekaligus menghidupkan kembali keanekaragaman hayati di wilayah ini.
                </Typography>
                <Typography color={"primary"} variant="h5" textAlign={"justify"} fontSize={{xs: "1rem", sm: "1.5rem"}}>
                    Kegiatan CANVASPLANT tidak hanya sekadar menanam pohon, tetapi juga melibatkan edukasi kepada masyarakat setempat mengenai pentingnya menjaga kelestarian mangrove. Dengan melibatkan berbagai pihak, mulai dari pemerintah desa, kelompok masyarakat, hingga siswa sekolah, diharapkan program ini dapat menumbuhkan kesadaran kolektif untuk menjaga lingkungan. Selain itu, CANVAS juga akan melakukan monitoring dan perawatan terhadap tanaman mangrove yang telah ditanam, sehingga keberlangsungan program ini dapat terjamin.
                </Typography>
                <Typography color={"primary"} variant="h5" textAlign={"justify"} fontSize={{xs: "1rem", sm: "1.5rem"}}>
                    Melalui CANVASPLANT, CANVAS berharap dapat memberikan kontribusi nyata dalam upaya pelestarian lingkungan di Kecamatan Muara Gembong. Selain itu, program ini juga diharapkan dapat menginspirasi orang lain untuk turut serta dalam menjaga kelestarian alam. Dengan bekerja sama, kita dapat menciptakan lingkungan yang lebih baik untuk generasi mendatang.
                </Typography>
 
                <Typography color={"primary"} variant="h4" marginInline={"5%"} textAlign={"justify"} fontSize={{xs: "1.5rem", sm: "2.125rem"}}>
                    <i>
                        "Kita tidak bisa melakukan ini semua tanpa bantuan kalian. 
                        Setiap donasi yang kalian berikan akan sangat berarti bagi 
                        keberlangsungan hidup ekosistem mangrove di Muara Gembong. 
                        Mari kita jadikan Muara Gembong lebih hijau dan lestari."
                    </i>
                </Typography>
                <Typography color={"primary"} variant="h5" marginInline={"10%"} fontSize={{xs: "1rem", sm: "1.5rem"}}>
                    <i>Michael Fernando, Ketua Umum CANVASPLANT</i>
                </Typography>
            </Stack>
        </Stack>
    );
}