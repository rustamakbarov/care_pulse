"use server";

import { ID, Query } from "node-appwrite";
import {
  APPOINTMENTS_COLLECTION_ID,
  DATABASE_ID,
  databases,
  messaging,
} from "../appwrite.config";
import { formatDateTime, parseStringify } from "../utills";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

export async function createAppointment(appointment: CreateAppointmentParams) {
  try {
    const newAppointment = await databases.createDocument(
      process.env.DATABASE_ID!,
      APPOINTMENTS_COLLECTION_ID!,
      ID.unique(),
      appointment
    );

    return parseStringify(newAppointment);
  } catch (err) {
    console.log("ERROR: ", err);
  }
}

export async function getAppointment(appointmentId: string) {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENTS_COLLECTION_ID!,
      appointmentId
    );

    return parseStringify(appointment);
  } catch (err) {
    console.log("ERROR: ", err);
  }
}

export async function getRecentAppointmentList() {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENTS_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (appointments.documents as Appointment[]).reduce(
      //@ts-ignore
      (acc, appointment) => {
        if (appointment.status === "scheduled") {
          acc.scheduledCount += 1;
        } else if (appointment.status === "pending") {
          acc.pendingCount += 1;
        } else if (appointment.status === "cancelled") {
          acc.cancelledCount += 1;
        }

        return acc;
      },
      initialCounts
    );

    const data = {
      totalCounts: appointments.total,
      ...counts,
      documents: appointments.documents,
    };

    return parseStringify(data);
  } catch (err) {
    console.log("ERROR: ", err);
  }
}

export async function updateAppointment({
  appointmentId,
  userId,
  appointment,
  type,
}: UpdateAppointmentParams) {
  try {
    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENTS_COLLECTION_ID!,
      appointmentId,
      appointment
    );

    if (!updatedAppointment) {
      throw new Error("Appointment not found!");
    }

    //TODO SMS notification
    const smsMessage = `
    Hi, it is CarePulse. 
    ${
      type === "schedule"
        ? `Your appointment has been scheduled for ${
            formatDateTime(appointment.schedule).dateTime
          } with Dr.${appointment.primaryPhysician}.`
        : `We regret to inform you that your appointment has been cancelled for the following reason: ${appointment.cancellationReason}`
    }`;

    await sendSMSNotification(userId, smsMessage);

    revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (err) {
    console.log("ERROR: ", err);
  }
}

export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId]
    );

    return parseStringify(message);
  } catch (error) {
    console.log("ERROR: ", error);
  }
};
