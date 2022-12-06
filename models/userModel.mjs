import mongoose from 'mongoose';
import validator from 'validator';
import slugify from 'slugify';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  slug: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    select: false,
    validate: {
      validator: function(email) {
        return validator.isEmail(email);
      },
      message: 'Invalid Email'
    }
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: true,
    select: false,
    validate: {
      validator: function(pw) {
        return pw.length > 8;
      },
      message: 'Password needs to be longer than 8 characters'
    }
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      validator: function(pw) {
        return this.password === pw;
      },
      message: 'Passwords do not match'
    }
  },
  links: [
    {
      title: String,
      link: String
    }
  ]
});

userSchema.pre('save', async function(next) {
  if (!this.isNew) next();
  this.slug = slugify(this.name, { lower: true });
  this.passwordConfirm = undefined;
  this.password = await bcrypt.hash(this.password, 14);
  next();
});

const user = mongoose.model('user', userSchema);

export default user;
