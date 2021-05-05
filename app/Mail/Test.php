<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class Test extends Mailable
{
    use Queueable, SerializesModels;

    private $address, $title, $message;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($address, $title, $message)
    {
        //
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mail')->with(['address' => $this->address, 'tile' => $this->title, 'message' => $this->message]);
    }
}
