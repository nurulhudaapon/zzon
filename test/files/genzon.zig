const std = @import("std");
const simple_parsed = @import("simple-parsed.zon");

pub fn main() !void {
    const allocator = std.heap.page_allocator;
    var buff = std.ArrayList(u8).init(allocator);
    defer buff.deinit();
    try std.json.stringify(simple_parsed, .{}, buff.writer());
    std.debug.print("Parsed: {s}\n", .{buff.items});
}
