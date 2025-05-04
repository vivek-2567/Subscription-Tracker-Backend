import Subscription from "../models/subscription.model.js"

export const createSubscription = async (req, res, next) => {
	try {
		const subscription = await Subscription.create({
			...req.body,
			user: req.user._id,
		})


    
    res.status(201).json({
			success: true,
			data: subscription,
		})
	} catch (error) {
		next(error)
	}
}

export const getUserSubscription = async (req, res, next) => {
  try{

    if(req.user.id !== req.params.id){
      const error = new Error("You are not the owner of this account")
      error.status = 401
      throw error
    }

    const subscription = await Subscription.findOne({user: req.params.id})

    res.status(200).json({
      success: true,
      data: subscription,
    })

  }
  catch(error){
    next(error)
  }
}

export const getAllSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find();

    res.status(200).json({
      success: true,
      count: subscriptions.length,
      data: subscriptions
    });
  } catch (error) {
    next(error);
  }
}

export const updateSubscription = async (req, res, next) => {
  try {
    const subscriptionId = req.params.id;
    const updateData = req.body;

    // Check if subscription exists
    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      const error = new Error('Subscription not found');
      error.statusCode = 404;
      throw error;
    }

    // Check if the user is the owner of the subscription
    if (subscription.user.toString() !== req.user._id.toString()) {
      const error = new Error('Not authorized to update this subscription');
      error.statusCode = 403;
      throw error;
    }

    // Update only the fields that are provided in the request
    Object.keys(updateData).forEach(key => {
      subscription[key] = updateData[key];
    });

    // Save the updated subscription
    const updatedSubscription = await subscription.save();

    res.status(200).json({
      success: true,
      message: 'Subscription updated successfully',
      data: updatedSubscription
    });
  } catch (error) {
    next(error);
  }
}

export const deleteSubscription = async (req, res, next) => {
  try {
    const subscriptionId = req.params.id;

    // Check if subscription exists
    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      const error = new Error('Subscription not found');
      error.statusCode = 404;
      throw error;
    }

    // Check if the user is the owner of the subscription
    if (subscription.user.toString() !== req.user._id.toString()) {
      const error = new Error('Not authorized to delete this subscription');
      error.statusCode = 403;
      throw error;
    }

    // Delete the subscription
    await Subscription.findByIdAndDelete(subscriptionId);

    res.status(200).json({
      success: true,
      message: 'Subscription deleted successfully'
    });
  } catch (error) {
    next(error);
  }
}

export const cancelSubscription = async (req, res, next) => {
  try {
    const subscriptionId = req.params.id;

    // Check if subscription exists
    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      const error = new Error('Subscription not found');
      error.statusCode = 404;
      throw error;
    }

    // Check if the user is the owner of the subscription
    if (subscription.user.toString() !== req.user._id.toString()) {
      const error = new Error('Not authorized to cancel this subscription');
      error.statusCode = 403;
      throw error;
    }

    // Check if subscription is already cancelled
    if (subscription.status === 'cancelled') {
      return res.status(200).json({
        success: true,
        message: 'Subscription is already cancelled'
      });
    }

    // Update subscription status to cancelled
    subscription.status = 'cancelled';
    await subscription.save();

    res.status(200).json({
      success: true,
      message: 'Subscription cancelled successfully',
      data: subscription
    });
  } catch (error) {
    next(error);
  }
}

export const getUpcomingRenewals = async (req, res, next) => {
  try {
    // Get current date
    const currentDate = new Date();

    // Find active subscriptions with upcoming renewals for the current user
    const subscriptions = await Subscription.find({
      user: req.user._id,
      status: 'active',
      renewalDate: { $gte: currentDate }
    }).sort({ renewalDate: 1 }); // Sort by renewal date in ascending order

    res.status(200).json({
      success: true,
      count: subscriptions.length,
      data: subscriptions
    });
  } catch (error) {
    next(error);
  }
}

