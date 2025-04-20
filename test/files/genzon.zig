const std = @import("std");
const simple_parsed = @import("simple-parsed.zon");
const check = @import("check.zon");

pub fn main() !void {
    const allocator = std.heap.page_allocator;
    var buff = std.ArrayList(u8).init(allocator);
    defer buff.deinit();

    try std.json.stringify(simple_parsed, .{}, buff.writer());
    std.debug.print("Parsed (simple-parsed): \n{s}\n", .{buff.items});
    buff.clearRetainingCapacity();

    try std.json.stringify(check, .{}, buff.writer());
    std.debug.print("Parsed (check): \n{s}\n", .{buff.items});
    buff.clearRetainingCapacity();
}
