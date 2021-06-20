import { makeStyles, Theme } from "@material-ui/core";
import clsx from "clsx";
import { useRef } from "react";


const useStyles = makeStyles((theme: Theme) => ({
    image: {
        width: "13rem",
        height: "13rem",
        "& img": {
            width: "100%",
            height: "100%",
            borderRadius: "50%",
        }
    },
    imgContainer: {
        margin: "2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        padding: "2rem",
    }
}));


function ImageUploader(props: any) {

    const { defaultImage, radious, handleUpload, className }: any = props;
    const classes = useStyles();

    const uploadedImage = useRef<any>(null);
    const imageUploader = useRef<any>(null);

    const handleImageUpload = (event: any) => {
        const [file] = event.target.files;
        if (file) {
            const reader = new FileReader();
            if (uploadedImage !== null) {
                const { current } = uploadedImage;
                if (current !== null) {
                    current.file = file;
                    reader.onload = (eventImg: any) => {
                        current.src = eventImg.target.result;
                    }
                    reader.readAsDataURL(file);
                    console.log(file);
                }
            }
        }
    };

    const containerClass = clsx(classes.imgContainer, className);
    return (
        <div className={containerClass}>
            <input
                type="file"
                accept="image/*"
                multiple={false}
                onChange={handleImageUpload}
                ref={imageUploader}
                style={{
                    display: "none"
                }}
            />
            <div className={classes.image} onClick={() => imageUploader.current.click()}>
                <img ref={uploadedImage} style={{
                    borderRadius: radious
                }} src={defaultImage} alt="Imagen"  />
            </div>
        </div>
    );
}

export default ImageUploader;