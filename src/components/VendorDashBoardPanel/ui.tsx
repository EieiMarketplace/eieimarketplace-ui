"use client"
import { getVendorReservation } from "@/services/getVendorReservation";
import { VendorReservation } from "@/shared/interface";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

export default function VendorDashboardPanel(){
    const { data: session } = useSession();
    const userID = session?.user.id;
    const token = session?.user.token!;
    
    const [Reservations, setReservations] = useState<VendorReservation[]>([]);

    const fetchReservations = useCallback(async () => {
        try {
            const Reservation = await getVendorReservation(userID as string, token);
            setReservations(Reservation);
            console.log(Reservation);
        } catch (err) {
            console.error("Failed to fetch reservation:", err);
        }
    }, []);

    // load
    useEffect(() => {
        fetchReservations();
    }, [fetchReservations]);

    return (
        <div>
            <h2>My Reservations</h2>
            {Reservations.length === 0 ? (
                <p>No reservations found.</p>
            ) : (
                <ul>
                    {Reservations.map((reservation) => (
                        <li key={reservation.id}>
                            <div>Market: {reservation.markets.market_name} {reservation.markets.marketType} {reservation.markets.isOpen}</div>
                            <div>Date: (TO PUT)</div>
                            <div>
                                {reservation.log
                                    ? `${reservation.log.name} - ${reservation.log.size} - ${reservation.log.price} - ${reservation.log.user_id} - ${reservation.log.reservation_id}`
                                    : ""
                                }
                            </div>
                            <div>Status: {reservation.vendorReservationStatus}</div>
                            <div>---</div>
                         
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}