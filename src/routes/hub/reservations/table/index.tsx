import { component$ } from "@builder.io/qwik";

export default component$(() => {
    const weekdays = ["Pondělí", "Úterý", "st, ct", "paye"]; // Example weekdays
    const timeSlots = [
        "8:00 - 9:00",
        "9:00 - 10:00",
        "10:00 - 11:00",
        "12:00 - 13:00",
        "14:00 - 15:00",
        "16:00 - 17:00",
        "18:00 - 19:00",
    ]; // Example time slots

    return (
        <main class="flex flex-col pb-12 bg-white">
            <Header />
            {weekdays.map((day) => (
                <DaySection day={day} timeSlots={timeSlots} />
            ))}
        </main>
    );
});

const Header = component$(() => (
    <header class="flex justify-center items-center px-16 py-5 w-full whitespace-nowrap bg-white border border-solid border-zinc-100 max-md:px-5 max-md:max-w-full">
        <div class="flex gap-5 justify-between items-center w-full max-w-[1039px] max-md:flex-wrap max-md:max-w-full">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/a95bf282fcddbba03a5f7a69d8ae10f82efcdc1f2e898843be4c80054d7b82a3?apiKey=5f8800354e48492a8dde34484b4d21da&" class="self-stretch aspect-[1.52] w-[59px]" alt="Logo" />
            <PersonalInfo />
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/6ec3f0d27dace55dbb7bed8c363fafb5cc332ffcae52596a41d9cd7eac031791?apiKey=5f8800354e48492a8dde34484b4d21da&" class="self-stretch my-auto w-6 aspect-[0.96]" alt="Menu Icon" />
        </div>
    </header>
));

const PersonalInfo = component$(() => (
    <div class="flex gap-4 self-stretch my-auto">
        <div class="justify-center items-center px-3 text-sm font-bold tracking-normal text-center text-teal-300 rounded-md aspect-square bg-neutral-200 h-[35px]">LD</div>
        <div class="flex flex-col flex-1 my-auto">
            <div class="text-xs font-bold tracking-normal text-black">Lumír Vychoválek</div>
            <div class="mt-1.5 text-xs font-semibold tracking-normal text-zinc-600">Lektor</div>
        </div>
    </div>
));

const DaySection = component$(({ day, timeSlots }) => (
    <section class="flex flex-col px-11 mt-16 w-full text-black text-opacity-80 max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <DayHeading day={day} />
        <div class="flex gap-4 justify-between self-center pr-5 mt-11 ml-20 text-sm tracking-normal text-black max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
            {timeSlots.map((time:string) => (
                <TimeSlot time={time} />
            ))}
        </div>
        <AppointmentGrid />
    </section>
));

const DayHeading = component$(({ day }) => (
    <div class="flex gap-5 justify-between items-start mx-4 text-black max-md:flex-wrap max-md:mr-2.5 max-md:max-w-full">
        <div class="flex-auto text-4xl tracking-tight">{day}</div>
    </div>
));

const TimeSlot = component$(({ time }) => (
    <div tabIndex={0} class="grow whitespace-nowrap">{time}</div>
));

const AppointmentGrid = component$(() => (
    <div class="flex gap-2 justify-between items-center mt-3 text-base font-light tracking-normal text-center whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
        <AppointmentSlot status="Volné" />
        <AppointmentSlot status="Obsazeno" name="Pavel Ježek" />
        <AppointmentSlot status="Volné" />
        {/* Repeat for the rest of the slots as needed */}
    </div>
));

const AppointmentSlot = component$(({ status, name }) => (
    <div class="justify-center items-center self-stretch px-5 my-auto rounded-xl bg-teal-300 bg-opacity-10 h-[81px] max-md:px-5">{status === "Volné" ? "Volné" : name}</div>
));