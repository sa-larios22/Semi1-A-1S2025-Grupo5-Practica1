import { useDispatch, useSelector } from 'react-redux';
import { onChecking, onLogin, onLogout } from '../store'
import { appApi } from '../api/appApi';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {

    const { status, user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const startLogin = async({ email, password }) => { 
        dispatch(onChecking());

        try {
            const { data } = await appApi.post('/auth/login', { email, password });

            localStorage.setItem('auth-status', true);

            dispatch( onLogin({
                id: data.user.id,
                email: data.user.email,
                name: data.user.firstName,
                lastname: data.user.lastName,
                role: data.user.role,
                profilePicture: data.user.profilePicture,
            }));

            navigate('/');
        } catch (error) {
            console.log(error);

        }
    }

    const startRegisterUser = async({ name, lastname, email, password, yyymmdd, image}) => {
        try {

            console.log(name, lastname, email, password, yyymmdd, image, "USER");
            const formData = new FormData();
            formData.append("file", image);
            const response = await appApi.post("auth/upload-profile-picture", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data.status !== 201) {
                return;
            }
        
            const profilePicture = response.data.url;

            const res = await appApi.post('/auth/register', { firstName: name, lastName: lastname, email, password, birthDate: yyymmdd, profilePicture, role: "USER" });

            if (res.data.message === "Usuario registrado exitosamente") {
                navigate('/login');
            }
            navigate('/register');
            return;
        } catch (error) {
            console.log(error);
            return;
        }
    }

    const startLogOut = () => {
        localStorage.clear();
        dispatch(onLogout());
    }

    return {
        status,
        user,
        startLogin,
        startLogOut,
        startRegisterUser
    }

}