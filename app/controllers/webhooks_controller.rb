class WebhooksController < ApplicationController
    # disable csrf checking
    skip_before_action :verify_authenticity_token

    def create
        payload =request.body.read
        sig_header = request.env['HTTP_STRIPE_SIGNATURE']

        # TODO: check video on setting up endpoint_secret
        endpoint_secret = Rails.application.credentials.stripe[:webhook_secret]

        event = nil

        begin
            event = Stripe::Webhook.construct_event(payload, sig_header, endpoint_secret)
        rescue JSON::ParserError => e
            # invalid payload
            render json: {message: e}, status: 400
            return
        
        rescue Stripe::SignatureVerificationError => e
            # invalid signature
            render json: {message: e}, status: 400
            return            
        end
            
        # handle the event
        case event.type
        when 'payment_intent.succeed'
        payment_intent = event.data.object
        puts 'PaymentIntent was successful!'
        
        when 'payment_method.attached'
        payment_method = event.data.object
        puts 'PaymentMethod was attached to a Customer!'

        else
            puts "Unhandled event type: #{event.type}"

        render json: {message: 'success'}

    end

    private

    def calculate_order_amount(_items)
        # Replace this constant with a calculation of the order's amount
        # Calculate the order total on the server to prevent
        # people from directly manipulating the amount on the client
        1400
      end
end
