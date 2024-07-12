import { Dimensions, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import {React, useState} from 'react'
import {CustomTextInput, CustomButton} from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/userSlice'
import { store } from '../redux/store';


const { width, height } = Dimensions.get('window')

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {isLoading} = useSelector((state) => state.user);
    const dispatch = useDispatch()
    
    return (
        <View style={styles.container}>
            <View style={styles.topSide}>
                <Text style={{fontWeight:'800', fontSize:32, color:'tomato'}}>Oteloby</Text>
                <Text style={{fontWeight:'500', fontSize:15}}>otel mi ? loby mi ? oteloby</Text>
            </View>
            <View style={styles.midSide}>
                <CustomTextInput handleOnChangeText={(text) => setEmail(text)} handleValue={email} placeholder={"e-posta"}/>
                <CustomTextInput handleOnChangeText={(text) => setPassword(text)} handleValue={password} placeholder={"şifre"} secureText={true}/>
                <CustomButton onPress={()=> dispatch(login({email,password}))} title={"Giriş Yap"} active={!isLoading}  />
            </View>
            <View style={styles.bottomSide}>
                <Pressable onPress={()=> {navigation.navigate('Signup')}}>
                    <Text style={{margin:12,fontWeight:'600'}}>Hesabın yok mu ? kayıt ol.</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width / 1.1,
        alignSelf: 'center'
    },
    topSide:{
        justifyContent:'center',
        flex:2,
        alignItems:'center',
    },
    midSide:{
        flex:2,
    },
    bottomSide:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center',
    }
    
})