import * as functions from "firebase-functions";
import * as postmark from "postmark";

const client = new postmark.ServerClient(`${process.env.POSTMARK_KEY?.toString()}`);

exports.resendConfirmationEmail = functions.firestore.document("registrations/{id}").onWrite(async (snap, context) => {
    const prevRegistration = snap.before.data();
    const updatedRegistration = snap.after.data();

    functions.logger.log("--- registration updated ---");
    functions.logger.log("prev registration:", prevRegistration?.states);
    functions.logger.log("updated registration:", updatedRegistration?.states);

    // Only send email when resentAt is updated. Must be null before the update.
    if (prevRegistration?.states?.resentAt === updatedRegistration?.states?.resentAt) return null
    if (!updatedRegistration) return null
    
    try {
        const emailPayload = {
            From: "soporte@serialmtbtexcoco.com",
            To: updatedRegistration.email,
            TemplateAlias: "registration_confirmation-tlaloc",
            TemplateModel: {
                raceType: updatedRegistration.raceType,
                raceCategory: updatedRegistration.raceCategory,
                size: updatedRegistration.size,
                id: context.params.id,
            },
        }
        functions.logger.log("Sending email:", emailPayload)
        
        const emailResponse = await client.sendEmailWithTemplate(emailPayload);
        functions.logger.log('email sent response:', emailResponse)
        
        if (emailResponse?.Message === "OK") return Promise.resolve(true)
        return Promise.resolve(false);
    } catch (err) {
        functions.logger.warn("confirmation email error:", err)
        return Promise.resolve(false);
    }
});

exports.sendConfirmationEmail = functions.firestore.document("registrations/{id}").onUpdate(async (snap, context) => {
	const prevRegistration = snap.before.data();
    const updatedRegistration = snap.after.data();
    functions.logger.log("--- registration updated ---");
    functions.logger.log("prev registration:", prevRegistration.states);
    functions.logger.log("updated registration:", updatedRegistration.states);

    // Only send email when confirmedAt is set. Must be null before the update.
    if (prevRegistration?.states?.confirmedAt || !updatedRegistration?.states?.confirmedAt) return null

    try {
        const emailPayload = {
            From: "soporte@serialmtbtexcoco.com",
            To: updatedRegistration.email,
            TemplateAlias: "registration_confirmation-tlaloc",
            TemplateModel: {
                raceType: updatedRegistration.raceType,
                raceCategory: updatedRegistration.raceCategory,
                size: updatedRegistration.size,
                id: context.params.id,
            },
        }
        functions.logger.log("Sending email:", emailPayload)
        
        const emailResponse = await client.sendEmailWithTemplate(emailPayload);
        functions.logger.log('email sent response:', emailResponse)
        
        if (emailResponse?.Message === "OK") return Promise.resolve(true)
        return Promise.resolve(false);
    } catch (err) {
        functions.logger.warn("confirmation email error:", err)
        return Promise.resolve(false);
    }
});
