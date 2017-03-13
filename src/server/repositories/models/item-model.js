import mongoose from "mongoose"
import timestamps from "mongoose-timestamp"
import slugger from "mongoose-slug-generator"
import uniqueValidator from "mongoose-unique-validator"
import hidden from "mongoose-hidden"
import { InvalidTitleError } from "../../errors/invalid-title-error"
import { InvalidChecklistDateError } from "../../errors/invalid-checklist-date-error"

let ItemSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: mongoose.Types.ObjectId
        },
        __v: {
            type: Number,
            default: 0
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        category: {
            type: String,
            required: true,
            trim: true
        },
        unit: {
            type: String,
            default: "",
            trim: true
        },
        amount: {
            type: Number,
            required: true
        },
        checklist: {
            type: String,
            default: null
        },
        favorite: {
            type: Boolean,
            default: false
        },
        slug: {
            type: String,
            slug: "title",
            unique: true,
            slug_padding_size: 1
        },
        tags: {
            type: [String],
            required: true
        }
    },
    {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    }
)

ItemSchema.virtual("version").get(function () { return this.__v })
ItemSchema.virtual("id").get(function () { return this._id })

ItemSchema.plugin(timestamps)
ItemSchema.plugin(hidden())
ItemSchema.plugin(uniqueValidator, { message: "Attribute must be unique" })
ItemSchema.plugin(slugger)

ItemSchema.index(
    {
        "title": "text",
        "category": "text"
    },
    {
        name: "index1",
        weights: {
            title: 3,
            category: 1
        }
    }
)

// title check
ItemSchema.pre("save", function (next) {
    if (!/^[a-z]+/.test(this.slug)) {
        return next(new InvalidTitleError(this.title))
    }

    next()
})

// checklist date check
ItemSchema.pre("save", function (next) {
    if (!this.checklist) {
        this.checklist = null
        return next()
    }

    let parts = this.checklist.split("-")

    if (parseInt(parts[0]) > 1900 && parseInt(parts[1]) <= 12 && parseInt(parts[2]) <= 31) {
        return next()
    }

    next(new InvalidChecklistDateError())
})

export default mongoose.model("item", ItemSchema)
