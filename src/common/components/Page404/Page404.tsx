import Button from "@mui/material/Button"
import { MenuButton } from "common/components"
import { Path } from "common/routing"
import s from "./Page404.module.css"

export const Page404 = () => {
   return (
      <>
         <h1 className={s.title}>404</h1>
         <h2 className={s.subTitle}>page not found</h2>
         <div className={s.buttonLink}>
            <Button
               href={Path.Main}
               component={MenuButton}
               sx={{
                  margin: "30px auto",
                  backgroundColor: "primary.light",
                  color: "white",
                  "&:hover": { backgroundColor: "primary.main" },
               }}
            >
               To the main page
            </Button>
         </div>
      </>
   )
}
