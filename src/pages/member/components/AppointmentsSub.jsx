import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { bookClass, requestTrainerAppointment, createNotification } from '@/services/firebase/db';

export default function AppointmentsSub({ activeBookings, setActiveBookings, availableClasses, trainers, profile, toast }) {
  const [activeSegment, setActiveSegment] = useState('classes'); // classes or private
  const [classBookingModal, setClassBookingModal] = useState(null);
  
  const [coachBookingModal, setCoachBookingModal] = useState(null);
  const [apptDetails, setApptDetails] = useState({ date: '', time: '', focus: '' });

  const handleBookClass = async () => {
    try {
      const res = await bookClass(profile.uid || 'guest', profile.name, classBookingModal);
      setActiveBookings(prev => [{ ...res, id: Math.random().toString() }, ...prev]);
      await createNotification(profile.uid || 'guest', 'Class Booked', `You reserved a spot in ${classBookingModal.name}.`, 'success');
      setClassBookingModal(null);
      toast.success(`Success! Spot reserved in ${classBookingModal.name}.`);
    } catch {
      toast.error('Booking failed.');
    }
  };

  const handleBookCoach = async (e) => {
    e.preventDefault();
    if (!apptDetails.date || !apptDetails.time || !apptDetails.focus.trim()) {
      toast.error('Please fill in appointment details.');
      return;
    }

    try {
      const res = await requestTrainerAppointment(profile.uid || 'guest', profile.name, {
        trainerId: coachBookingModal.id,
        trainerName: coachBookingModal.name,
        date: apptDetails.date,
        time: apptDetails.time,
        focus: apptDetails.focus
      });
      setActiveBookings(prev => [res, ...prev]);
      await createNotification(profile.uid || 'guest', 'Trainer Requested', `1-on-1 private coaching session requested with ${coachBookingModal.name}.`, 'info');
      setCoachBookingModal(null);
      setApptDetails({ date: '', time: '', focus: '' });
      toast.success(`Private coaching session requested with ${coachBookingModal.name}.`);
    } catch {
      toast.error('Request failed.');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex border-b border-gym-gray-800">
        <button
          onClick={() => setActiveSegment('classes')}
          className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider text-center border-b-2 transition-all cursor-pointer ${
            activeSegment === 'classes' ? 'border-primary text-white' : 'border-transparent text-gym-gray-500 hover:text-white'
          }`}
        >
          Scheduled Classes Roster
        </button>
        <button
          onClick={() => setActiveSegment('private')}
          className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider text-center border-b-2 transition-all cursor-pointer ${
            activeSegment === 'private' ? 'border-primary text-white' : 'border-transparent text-gym-gray-500 hover:text-white'
          }`}
        >
          Book 1-on-1 Personal Trainer
        </button>
      </div>

      {activeSegment === 'classes' ? (
        <div className="space-y-4">
          {availableClasses.map((item) => {
            const isBooked = activeBookings.some(b => b.type === 'class' && b.classId === item.id);
            return (
              <div key={item.id} className="glass-card p-5 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">{item.name}</h4>
                  <p className="text-xs text-gym-gray-400">Coach: {item.trainer} &bull; Room: {item.room}</p>
                  <p className="text-[10px] text-gym-gray-500">Day: {item.date} &bull; Time: {item.time} &bull; Capacity: {item.booked}/{item.capacity}</p>
                </div>
                <div>
                  {isBooked ? (
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1.5 rounded block text-center border border-primary/20">Reserved</span>
                  ) : (
                    <Button variant="primary" onClick={() => setClassBookingModal(item)}>Reserve Spot</Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trainers.map((tr) => (
            <div key={tr.id} className="glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-bold text-white">{tr.name}</h4>
                  <span className="text-[10px] text-primary font-bold">Rating: {tr.rating}</span>
                </div>
                <p className="text-[10px] text-gym-gray-400 uppercase tracking-wider mt-1">{tr.specialty}</p>
                <p className="text-xs text-gym-gray-500 mt-2 italic">"{tr.bio}"</p>
                <p className="text-[10px] text-gym-gray-550 mt-2 font-bold uppercase">Experience: {tr.experience}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-gym-gray-855/40">
                <Button variant="secondary" className="w-full justify-center" onClick={() => setCoachBookingModal(tr)}>Request Booking</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Class Confirmation modal */}
      <Modal isOpen={classBookingModal !== null} onClose={() => setClassBookingModal(null)} title="Class Reservation">
        <div className="space-y-4">
          <p className="text-xs text-gym-gray-400 leading-relaxed">
            Confirm your reservation for <strong className="text-white">{classBookingModal?.name}</strong> led by coach <strong className="text-white">{classBookingModal?.trainer}</strong>. Room: {classBookingModal?.room}.
          </p>
          <div className="flex justify-end gap-3 pt-4 border-t border-gym-gray-800">
            <Button variant="outline" onClick={() => setClassBookingModal(null)}>Cancel</Button>
            <Button variant="primary" onClick={handleBookClass}>Confirm Booking</Button>
          </div>
        </div>
      </Modal>

      {/* Trainer Booking modal */}
      <Modal isOpen={coachBookingModal !== null} onClose={() => setCoachBookingModal(null)} title={`Book Session with ${coachBookingModal?.name}`}>
        <form onSubmit={handleBookCoach} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">Session Date</label>
              <input 
                type="date"
                required
                className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded px-4 py-2.5 text-xs text-white focus:outline-none focus:border-primary font-mono font-bold"
                value={apptDetails.date}
                onChange={(e) => setApptDetails({ ...apptDetails, date: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">Session Time</label>
              <input 
                type="time"
                required
                className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded px-4 py-2.5 text-xs text-white focus:outline-none focus:border-primary font-mono font-bold"
                value={apptDetails.time}
                onChange={(e) => setApptDetails({ ...apptDetails, time: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">Focus / Goals of Session</label>
            <textarea 
              required
              className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded px-4 py-2.5 text-xs text-white focus:outline-none focus:border-primary h-20 resize-none"
              placeholder="e.g. Back squat sticking point biomechanics"
              value={apptDetails.focus}
              onChange={(e) => setApptDetails({ ...apptDetails, focus: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gym-gray-800">
            <Button variant="outline" onClick={() => setCoachBookingModal(null)}>Cancel</Button>
            <Button type="submit" variant="primary">Confirm Request</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
