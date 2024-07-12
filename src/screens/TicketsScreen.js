import { StyleSheet, Text, View } from 'react-native'
import { React, useEffect, useState } from 'react'
import TicketCard from '../components/TicketCard';
import { CustomButton } from '../components';
import { getChecks, getTickets, checkIn } from '../redux/ticketSlice';
import { setStatus } from '../redux/ticketSlice';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../redux/store';

const TicketsScreen = () => {
    const { data, status, checks } = useSelector((state) => state.ticket);
    const { isLoading, userEmail } = useSelector((state) => state.user);
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getTickets({ userEmail }))
    }, [])

    useEffect(() => {
        dispatch(getChecks({ userEmail }))
    }, [status])

    if (status != null) {
        if (status == "basarisiz") {
            return (
                <View>
                    <Text>Bir Hata Oluştu, Daha sonra tekrar deneyiniz.</Text>
                    <CustomButton title={"Tamam"} onPress={() => dispatch(setStatus(null))} />
                </View>
            )
        } else if (status == "basarili") {
            return (
                <View>
                    <Text>Check In İşleminiz Başarıyla Yapılmıştır.</Text>
                    <CustomButton title={"Tamam"}  onPress={() => dispatch(setStatus(null))} />
                </View>
            )
        } else if (status =="zaman") {
            return (
                <View>
                    <Text>Check In işlemini yapacağınız gün biletinizin başlangıç günüyle aynı olmalı.</Text>
                    <CustomButton title={"Tamam"}  onPress={() => dispatch(setStatus(null))} />
                </View>
            )
        }
    }
    return (
        <View>
            {data.map((ticket, index) => {
                  const start = ticket.start.toDate();
                  const end = ticket.end.toDate();
                const formattedEnd = `${end.getDate()}/${end.getMonth() + 1}/${end.getFullYear()}`;
                const formattedStart = `${start.getDate()}/${start.getMonth() + 1}/${start.getFullYear()}`;
                const id = ticket.id
                const date = ticket.start
                const extraCheck = checks[index];

                return (
                    <View>
                        <TicketCard active={!isLoading && !extraCheck}
                            onPress={() => dispatch(checkIn({id,date}))}
                            start={formattedStart} end={formattedEnd}
                            room={ticket.room}
                            bed={ticket.bed}
                            number={ticket.number}
                            checkIn={extraCheck} />
                    </View>
                );
            })}
        </View>

    )
}

export default TicketsScreen

const styles = StyleSheet.create({})
