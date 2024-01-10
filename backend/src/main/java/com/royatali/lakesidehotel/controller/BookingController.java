package com.royatali.lakesidehotel.controller;

import com.royatali.lakesidehotel.exception.InvalidBookingRequestException;
import com.royatali.lakesidehotel.exception.ResourceNotFoundException;
import com.royatali.lakesidehotel.model.BookedRoom;
import com.royatali.lakesidehotel.model.Room;
import com.royatali.lakesidehotel.response.BookingResponse;
import com.royatali.lakesidehotel.response.RoomResponse;
import com.royatali.lakesidehotel.service.IBookingService;
import com.royatali.lakesidehotel.service.IRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;


@RequiredArgsConstructor
@RestController
@RequestMapping("/bookings")
public class BookingController {
    private final IBookingService bookingService;
    private final IRoomService roomService;

    @GetMapping("/all-bookings")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<BookingResponse>> getAllBookings(){
        List<BookedRoom> bookings =  bookingService.getAllBookings();
        List<BookingResponse> bookingResponses = new ArrayList<>();

        for(BookedRoom booking:bookings){
            BookingResponse bookingResponse = getBookingResponse(booking);
            bookingResponses.add(bookingResponse);
        }

        return ResponseEntity.ok(bookingResponses);
    }

    @GetMapping("/confirmation/{confirmationCode}")
    public ResponseEntity<?> getBookingByConfirmationCode(@PathVariable String confirmationCode){
        try{
            BookedRoom booking = bookingService.findByBookingConfirmationCode(confirmationCode);
            BookingResponse bookingResponse = getBookingResponse(booking);
            return ResponseEntity.ok(bookingResponse);
        }catch(ResourceNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @GetMapping("/user/{email}/bookings")
    public ResponseEntity<List<BookingResponse>> getBookingsByUserEmail(@PathVariable String email) {
        List<BookedRoom> bookings = bookingService.getBookingsByUserEmail(email);
        List<BookingResponse> bookingResponses = new ArrayList<>();
        for (BookedRoom booking : bookings) {
            BookingResponse bookingResponse = getBookingResponse(booking);
            bookingResponses.add(bookingResponse);
        }
        return ResponseEntity.ok(bookingResponses);
    }

    @PostMapping("/room/{roomId}/booking")
    public ResponseEntity<?> saveBooking (@PathVariable Long roomId,@RequestBody BookedRoom bookingRequest){
        try{
            String confirmationCode = bookingService.saveBooking(roomId,bookingRequest);
            return ResponseEntity.ok("Room booked successfully! Your booking confirmation code is : " + confirmationCode);
        }
        catch (InvalidBookingRequestException e){
            return ResponseEntity.badRequest().body(e.getMessage());

        }
    }

    @DeleteMapping("/booking/{bookingId}/delete")
    public void cancelBooking(@PathVariable  Long bookingId){
        bookingService.cancelBooking(bookingId);
    }


    private  BookingResponse getBookingResponse(BookedRoom booking){
        Room theRoom = roomService.getRoomById(booking.getRoom().getId()).get();
        RoomResponse room = new RoomResponse(
                theRoom.getId(),
                theRoom.getRoomType(),
                theRoom.getRoomPrice());

        return new BookingResponse(
                booking.getBookingId(), booking.getCheckInDate(),
                booking.getCheckOutDate(),booking.getGuestFullName(),
                booking.getGuestEmail(), booking.getNumOfAdults(),
                booking.getNumOfChildren(), booking.getTotalNumOfGuests(),
                booking.getBookingConfirmationCode(), room);
    }
    }



