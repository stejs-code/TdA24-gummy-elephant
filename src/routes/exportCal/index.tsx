import type {RequestHandler} from "@builder.io/qwik-city"
import ical from "ical-generator";
import {ApiError} from "~/app/apiError";
import {Context} from "~/app/context"
import {getLecturerReservations} from "~/app/reservation";
import {handleRequestHandlingError} from "~/app/utils";
import type {Session} from "~/app/session";


export const onGet: RequestHandler = async ({env, json, send, sharedMap}) => {
    try {
        const calendar = ical({name: 'calendar'});

        const session = sharedMap.get("session") as Session | undefined;
        if (session === undefined) {
            json(401, {error: "Auth headers required."})
        } else {
            const ctx = new Context({env})
            const lecturer = session.user.uuid;
            const reservations = await getLecturerReservations(ctx, lecturer);
            if (!(reservations instanceof ApiError)) {
                reservations.map(res => {
                    const end = new Date(res.dateAt);
                    const start = new Date(res.dateAt);
                    start.setHours(res.hourStart)
                    end.setHours(res.hourEnd)
                    calendar.createEvent({
                        start: start,
                        end: end,
                        summary: `Lecturing ${res.student.first_name} ${res.student.last_name}`,
                        description: `${res.student.first_name} ${res.student.last_name} - ${res.student.email} - ${res.student.telephone} \n${res.note}`,
                        location: res.meetingType,
                    })
                })
            }


            send(new Response(calendar.toString(), {
                status: 200,
                headers:
                    {
                        'Content-Type': 'text/calendar; charset=utf-8',
                        'Content-Disposition': 'attachment; filename="calendar.ics"'
                    }
            }))
        }
    } catch (e) {
        handleRequestHandlingError(e, json)
    }
}


